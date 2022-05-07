import MedicineThirtyMinutes from '../../../../assets/image/medicine_thirtyminutes.png';
import MedicineConfirmation from '../../../../assets/image/medicine_confirmation.png';
import MedicinePayment from '../../../../assets/image/medicine_payment.png';
import MedicineDelivery from '../../../../assets/image/medicine_delivery.png';
import MedicineCompleted from '../../../../assets/image/medicine_completed.png';

export interface IDataFlowMedicine {
	id: number;
	imagePath: string;
	description: string;
}

export const dataFlowMedicineDelivery: IDataFlowMedicine[] = [
	{
		id: 1,
		imagePath: MedicineThirtyMinutes,
		description: '1. Anda akan dihubungi oleh petugas farmasi Rumah Sakit 30 menit setelah catatan medis diterima'
	}, {
		id: 2,
		imagePath: MedicineConfirmation,
		description: '2.  Konfirmasi pembelian obat dan alamat pengiriman obat kepada petugas farmasi'
	}, {
		id: 3,
		imagePath: MedicinePayment,
		description: '3. Selesaikan pembayaran online yang tersedia untuk membeli obat'
	}, {
		id: 4,
		imagePath: MedicineDelivery,
		description: '4. Obat Anda akan dikirim ke alamat tujuan'
	}, {
		id: 5,
		imagePath: MedicineCompleted,
		description: '5. Yeay! Obat sudah sampai di tujuan'
	}
]