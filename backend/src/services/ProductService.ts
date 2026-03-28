export class ProductService {
    async getCards() {
        return [
            {
                cardType: 'SMART_ONLY',
                slug: 'carteon-smart-card',
                name: 'Carteon Smart Card',
                description: 'Premium NFC-enabled smart business card',
                basePrice: 15000,
                finishes: ['Matte Black Metal', 'Gold Metal', 'Silver Metal', 'Gold mirror']
            },
            {
                cardType: 'PVC_QR_ONLY',
                slug: 'pvc-qr-card',
                name: 'PVC QR Card',
                description: 'PVC card with scannable QR code',
                basePrice: 5000,
                finishes: []
            },
            {
                cardType: 'COMPLETE_PACKAGE',
                slug: 'complete-package',
                name: 'Complete Package',
                description: 'Bundle of Smart Card and PVC QR Card',
                basePrice: 18000,
                finishes: ['Matte Black Metal', 'Gold Metal', 'Silver Metal', 'Gold mirror']
            }
        ];
    }
}
