import { useState, useEffect } from "react";
import CameraForm from "../components/CameraForm";
import CameraCard from "../components/CameraCard";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [cameras, setCameras] = useState([]);
  const [cameraToEdit, setCameraToEdit] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const localCameras = JSON.parse(localStorage.getItem("cameras")) || [];
    setCameras(localCameras);
  }, []);

  const saveCameras = (updatedCameras) => {
    setCameras(updatedCameras);
    localStorage.setItem("cameras", JSON.stringify(updatedCameras));
  };

  const addCamera = (camera) => saveCameras([...cameras, camera]);
  const deleteCamera = (id) => saveCameras(cameras.filter(c => c.id !== id));
  const editCamera = (updatedCamera) =>
    saveCameras(cameras.map(c => c.id === updatedCamera.id ? updatedCamera : c));
  const startEdit = (camera) => {
    setCameraToEdit(camera);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const clearEdit = () => setCameraToEdit(null);

  const filteredCameras = cameras.filter(c =>
    c.brand.toLowerCase().includes(search.toLowerCase()) ||
    c.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <input
          type="text"
          placeholder="Marka veya model ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <CameraForm
          addCamera={addCamera}
          editCamera={editCamera}
          cameraToEdit={cameraToEdit}
          clearEdit={clearEdit}
        />
    <h2 className="text-xl font-semibold mb-4 text-center bg-purple-200 rounded p-2">Kamera Listesi:</h2>
        {filteredCameras.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">Aramaya uygun kamera bulunamadı.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCameras.map(camera => (
              <CameraCard
                key={camera.id}
                camera={camera}
                deleteCamera={deleteCamera}
                startEdit={startEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}