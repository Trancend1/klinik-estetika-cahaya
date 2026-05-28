export default function PasienDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Detail Pasien</h1>
      <p className="text-gray-500 text-sm mt-2">ID: {params.id} — Detail pasien dibangun di Phase 4.</p>
    </div>
  );
}
