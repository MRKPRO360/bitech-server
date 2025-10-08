declare module 'sslcommerz-lts' {
  interface SSLCommerzInitData {
    total_amount: number;
    currency: string;
    tran_id: string;
    success_url: string;
    fail_url: string;
    cancel_url: string;
    ipn_url: string;
    cus_name: string | undefined;
    cus_email: string | undefined;
    cus_city: string | undefined;
    cus_postcode: string | undefined;
    cus_country: string | undefined;
    cus_phone: string | undefined;
  }

  class SSLCommerzPayment {
    constructor(storeId: string, storePassword: string, isLive: boolean);
    init(data: SSLCommerzInitData): Promise<any>;
  }

  export = SSLCommerzPayment;
}
