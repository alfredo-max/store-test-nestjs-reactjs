import { AxiosResponse } from 'axios';
import { HttpService } from "@nestjs/axios";
import { AxiosHeaders } from 'axios';
import { ExternalTokenServiceImpl } from "./external-token.service.impl";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { v4 as uuidv4 } from 'uuid';
import { PaymentPayload } from "src/modules/payment/domain/model/payment-payload";
import crypto from 'crypto';
import { of } from 'rxjs';

jest.mock('uuid');
jest.mock('crypto');

describe('ExternalTokenServiceImpl', () => {
    let service: ExternalTokenServiceImpl;
    let httpService: HttpService;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExternalTokenServiceImpl,
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn(),
                        post: jest.fn(),
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ExternalTokenServiceImpl>(ExternalTokenServiceImpl);
        httpService = module.get<HttpService>(HttpService);
        configService = module.get<ConfigService>(ConfigService);
    });

    describe('statusPayment', () => {
        it('should return status from transaction API response', async () => {
            const id = 'txn_123';
            const mockPrvKey = 'mock_private_key';
            const mockStatus = 'APPROVED';

            const mockResponse: AxiosResponse = {
                data: {
                    data: {
                        status: mockStatus,
                    },
                },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {
                    headers: new AxiosHeaders(), // <-- solución correcta aquí
                    url: '',
                    method: 'get',
                    timeout: 0,
                    transformRequest: [],
                    transformResponse: [],
                    params: {},
                },
            };

            (configService.get as jest.Mock).mockReturnValue(mockPrvKey);
            (httpService.get as jest.Mock).mockReturnValue(of(mockResponse));

            const result = await service.statusPayment(id);

            expect(configService.get).toHaveBeenCalledWith('PRV_KEY');
            expect(httpService.get).toHaveBeenCalledWith(
                `https://api-sandbox.co.uat.wompi.dev/v1/transactions/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${mockPrvKey}`,
                    },
                },
            );
            expect(result).toBe(mockStatus);
        });
    });

    describe('makePayment', () => {
        it('should send payment request and return transaction id', async () => {
            const mockIntegrityKey = 'mock_integrity_key';
            const mockPrvKey = 'mock_prv_key';
            const mockReference = 'mock-reference-123';
            const mockHash = 'mocked-hash-value';
            const mockTransactionId = 'transaction-123';

            (uuidv4 as jest.Mock).mockReturnValue(mockReference);

            const mockCreateHash = {
                update: jest.fn().mockReturnThis(),
                digest: jest.fn().mockReturnValue(mockHash),
            };
            (crypto.createHash as jest.Mock).mockReturnValue(mockCreateHash);

            (configService.get as jest.Mock).mockImplementation((key: string) => {
                if (key === 'INTEGRITY_KEY') return mockIntegrityKey;
                if (key === 'PRV_KEY') return mockPrvKey;
                return null;
            });

            const mockResponse: AxiosResponse = {
                data: {
                    data: {
                        id: mockTransactionId,
                    },
                },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {
                    headers: new AxiosHeaders(),
                    url: '',
                    method: 'post',
                    timeout: 0,
                    transformRequest: [],
                    transformResponse: [],
                    params: {},
                },
            };
            (httpService.post as jest.Mock).mockReturnValue(of(mockResponse));

            const payload: PaymentPayload = {
                acceptanceToken: 'acc-token',
                acceptPersonalAuth: 'acc-auth',
                amountInCents: 10000,
                currency: 'COP',
                signature: '',
                customerEmail: 'test@example.com',
                paymentMethod: {
                    type: 'CARD',
                    installments: 1,
                    token: 'token123',
                },
                reference: '',
                exp_month: '12',
                exp_year: '2026',
            };

            const result = await service.makePayment(payload);

            expect(uuidv4).toHaveBeenCalled();
            expect(crypto.createHash).toHaveBeenCalledWith('sha256');
            expect(mockCreateHash.update).toHaveBeenCalled();
            expect(mockCreateHash.digest).toHaveBeenCalledWith('hex');
            expect(httpService.post).toHaveBeenCalledWith(
                'https://api-sandbox.co.uat.wompi.dev/v1/transactions',
                expect.objectContaining({
                    acceptance_token: 'acc-token',
                    reference: mockReference,
                    signature: mockHash,
                }),
                {
                    headers: {
                        Authorization: `Bearer ${mockPrvKey}`,
                    },
                }
            );
            expect(result).toBe(mockTransactionId);
        });
    });

    describe('getAcceptanceTokens', () => {
        it('should fetch and return acceptance tokens', async () => {
            const mockPubKey = 'mock-public-key';

            const mockResponse: AxiosResponse = {
                data: {
                    data: {
                        presigned_acceptance: {
                            acceptance_token: 'token-123',
                            permalink: 'https://link-123',
                            type: 'online',
                        },
                        presigned_personal_data_auth: {
                            acceptance_token: 'token-456',
                            permalink: 'https://link-456',
                            type: 'personal_data',
                        },
                    },
                },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {
                    headers: new AxiosHeaders(),
                    url: '',
                    method: 'get',
                    timeout: 0,
                    transformRequest: [],
                    transformResponse: [],
                    params: {},
                },
            };

            (configService.get as jest.Mock).mockReturnValue(mockPubKey);
            (httpService.get as jest.Mock).mockReturnValue(of(mockResponse));

            const result = await service.getAcceptanceTokens();

            expect(configService.get).toHaveBeenCalledWith('PUB_KEY');
            expect(httpService.get).toHaveBeenCalledWith(
                `https://api-sandbox.co.uat.wompi.dev/v1/merchants/${mockPubKey}`
            );

            expect(result.presigned_acceptance.acceptance_token).toBe('token-123');
            expect(result.presigned_acceptance.permalink).toBe('https://link-123');
            expect(result.presigned_acceptance.type).toBe('online');

            expect(result.presigned_personal_data_auth.acceptance_token).toBe('token-456');
            expect(result.presigned_personal_data_auth.permalink).toBe('https://link-456');
            expect(result.presigned_personal_data_auth.type).toBe('personal_data');
        });
    });


});