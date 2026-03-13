export default function CameraCard({ camera, deleteCamera, startEdit }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={camera.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={camera.model}
        className="w-full h-48 object-cover rounded-t-lg grayscale hover:grayscale-0 transition-all"
        />
      <div className="p-4">
        <h2 className="text-xl font-bold">{camera.brand} {camera.model}</h2>
        <p>Yıl: {camera.year}</p>
        <p>Durum: {camera.status}</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => startEdit(camera)}
            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
          >
            Düzenle
          </button>
          <button
            onClick={() => deleteCamera(camera.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}