import { useState, useEffect } from "react";

export default function CameraForm({ addCamera, editCamera, cameraToEdit, clearEdit }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("Yeni");

  useEffect(() => {
    if (cameraToEdit) {
      setBrand(cameraToEdit.brand);
      setModel(cameraToEdit.model);
      setYear(cameraToEdit.year);
      setImageUrl(cameraToEdit.imageUrl);
      setStatus(cameraToEdit.status);
    }
  }, [cameraToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cameraData = {
      id: cameraToEdit ? cameraToEdit.id : Date.now(),
      brand,
      model,
      year,
      imageUrl,
      status,
    };
    if (cameraToEdit) {
      editCamera(cameraData);
      clearEdit();
    } else {
      addCamera(cameraData);
    }
    setBrand("");
    setModel("");
    setYear("");
    setImageUrl("");
    setStatus("Yeni");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Marka"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Yıl"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Görsel URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 rounded w-full"
        />
        
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded w-full md:col-span-2"
        >
          <option value="Yeni">Yeni</option>
          <option value="Kullanılmış">Kullanılmış</option>
        </select>
      </div>
      <button
        type="submit"
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {cameraToEdit ? "Güncelle" : "Kamera Ekle"}
      </button>
    </form>
  );
}