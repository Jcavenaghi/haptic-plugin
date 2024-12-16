import { framer } from "framer-plugin";
import { useState, useEffect } from "react";
import "./App.css";

framer.showUI({
  position: "top right",
  width: 500,
  height: 490,
});

type Sound = {
  name: string;
  url: string;
  image: string;
  metaphors: string;
};

const initialSounds: Sound[] = [
  {
    name: "v-09-09-8-11",
    url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-09-8-11.wav",
    image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-09-8-11.png",
    metaphors: "latido del corazón,pulsante,tocando,palpando",
  },
];

export function App() {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [filteredSounds, setFilteredSounds] = useState<Sound[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedSound, setSelectedSound] = useState<Sound | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal de autenticación
  const [uploadModalVisible, setUploadModalVisible] = useState(false); // Modal de subida de sonido
  const [soundDetails, setSoundDetails] = useState({
    name: "",
    description: "",
    metaphors: "",
    file: null as File | null,
  });

  useEffect(() => {
    const storedSounds = localStorage.getItem("sounds");
    if (storedSounds) {
      setSounds(JSON.parse(storedSounds));
      setFilteredSounds(JSON.parse(storedSounds));
    } else {
      setSounds(initialSounds);
      setFilteredSounds(initialSounds);
      localStorage.setItem("sounds", JSON.stringify(initialSounds));
    }

    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setAuthToken(storedToken);
      setIsLoggedIn(true);
    } else {
      setModalVisible(true); // Si no está logueado, muestra el modal de login
    }
  }, []);

  useEffect(() => {
    if (filter) {
      const filtered = sounds.filter((sound) =>
        sound.metaphors
          .toLowerCase()
          .split(",")
          .some((metaphor) => metaphor.trim().includes(filter.toLowerCase()))
      );
      setFilteredSounds(filtered);
    } else {
      setFilteredSounds(sounds);
    }
  }, [filter, sounds]);

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch((err) => console.error("Error reproduciendo el sonido:", err));
  };

  const saveMetaphors = (newMetaphors: string) => {
    if (selectedSound) {
      const updatedSounds = sounds.map((sound) =>
        sound.name === selectedSound.name
          ? { ...sound, metaphors: newMetaphors }
          : sound
      );
      setSounds(updatedSounds);
      setFilteredSounds(updatedSounds);
      localStorage.setItem("sounds", JSON.stringify(updatedSounds));
      setSelectedSound(null);
    }
  };

  const authenticateUser = () => {
    setModalVisible(true); // Mostrar el modal cuando el usuario no está autenticado
  };

  const handleAuthCodeSubmit = () => {
    const code = (document.getElementById("authCode") as HTMLInputElement).value;
    if (code) {
      setAuthToken(code);
      setIsLoggedIn(true);
      localStorage.setItem("authToken", code);
      setModalVisible(false);
      fetchSoundsFromFreesound(code);
    }
  };

  const fetchSoundsFromFreesound = async (token: string) => {
    try {
      const response = await fetch("https://freesound.org/apiv2/sounds/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const soundsFromApi = data.results.map((sound: any) => ({
        name: sound.name,
        url: sound.previews["preview-lq-ogg"], // URL del sonido en calidad baja
        image: sound.images.image || "", // Imagen asociada al sonido
        metaphors: "", // No se obtiene metáforas directamente
      }));
      setSounds(soundsFromApi);
      setFilteredSounds(soundsFromApi);
      localStorage.setItem("sounds", JSON.stringify(soundsFromApi));
    } catch (error) {
      console.error("Error al obtener sonidos de Freesound:", error);
    }
  };

  // Función para manejar el modal de subir sonido
  const handleOpenUploadModal = () => {
    setUploadModalVisible(true);
  };

// Función para manejar el envío del formulario de subida de sonido
const handleUploadSound = async () => {
  // Bloquear el botón de subida
  const uploadButton = document.getElementById("uploadSound") as HTMLButtonElement;
  uploadButton.disabled = true;

  const name = soundDetails.name.trim();
  const description = soundDetails.description.trim();
  const tags = soundDetails.metaphors.trim();
  const file = soundDetails.file;

  try {
    // Validar que todos los campos estén completos
    if (description === "" || tags === "" || !file) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Validar que haya al menos 3 tags
    if (tags.split(",").length < 3) {
      alert("Por favor, ingrese al menos 3 tags.");
      return;
    }

    // Validar que el nombre del sonido no exista en el arreglo de sounds
    if (sounds.some((sound) => sound.name === name)) {
      alert("El nombre ya existe en la lista de sonidos. Por favor, elija otro.");
      return;
    }

    // Crear el FormData para enviar el archivo
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("tags", tags);

    // Subir el sonido a Freesound
    const response = await fetch("https://freesound.org/apiv2/sounds/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`, // Autenticación con token
      },
      body: formData,
    });

    const data = await response.json();

    if (data.id) {
      // Si el sonido se sube exitosamente, actualizar la lista de sonidos
      const newSound: Sound = {
        name: name,
        url: data.previews["preview-lq-ogg"], // URL del sonido
        image: data.images.image || "", // Imagen asociada
        metaphors: tags, // Tags como metáforas
      };

      const updatedSounds = [...sounds, newSound];
      setSounds(updatedSounds);
      setFilteredSounds(updatedSounds);
      localStorage.setItem("sounds", JSON.stringify(updatedSounds)); // Actualizar en localStorage

      // Cerrar el modal y mostrar el mensaje de éxito
      setUploadModalVisible(false);
      alert("Sonido subido exitosamente! Aguarde unos minutos para que aparezca en la lista de sonidos.");

    } else {
      // Si ocurre un error al subir el sonido
      alert("Error al cargar el sonido. Por favor, inténtelo de nuevo.");
    }
  } catch (error) {
    console.error("Error al subir el sonido:", error);
    alert("Error al subir el sonido. Por favor, inténtelo de nuevo.");
  } finally {
    // Desbloquear el botón de subida
    uploadButton.disabled = false;
  }
};

  

  // Manejar cambios en el formulario de subida
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSoundDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSoundDetails((prevDetails) => ({
        ...prevDetails,
        file,
      }));
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Diseño Vibrante</h2>
      {!isLoggedIn ? (
        <button onClick={authenticateUser}>Iniciar sesión en Freesound</button>
      ) : (
        <div>
          <button onClick={handleOpenUploadModal}>Subir Sonido</button>
        </div>
      )}

      {/* Modal para ingresar el código de autorización */}
      {modalVisible && (
        <div id="registrationModal" className="modal" style={{ display: "block" }}>
          <div className="modal-content">
            <span
              className="close-register"
              onClick={() => setModalVisible(false)}
              style={{ cursor: "pointer" }}
            >
              &times;
            </span>
            <h2>Por favor registrese en FreeSound</h2>
            <p>
              Tienes que registrarte en FreeSound para poder subir sonidos. Por
              favor, haga clic en el botón de abajo para registrarse o iniciar
              sesión. Después de registrarse ingrese el 'Código de Autorización'
              para poder cargar sonidos.
            </p>
            <button id="registerButton">
              <a
                href="https://freesound.org/apiv2/oauth2/authorize/?client_id=sk4SYvtNWujw8dwXsjub&response_type=code&state=xyz"
                target="_blank"
              >
                Registrarse/Iniciar sesión
              </a>
            </button>
            <input
              type="text"
              id="authCode"
              placeholder="Código de autorización"
              required
            />
            <button
              id="saveAuthCode"
              onClick={handleAuthCodeSubmit}
              style={{ marginTop: "10px" }}
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {/* Modal de subir sonido */}
      {uploadModalVisible && (
  <div id="uploadModal" className="modal" style={{ display: "block" }}>
    <div
      className="modal-content"
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000", // Fondo negro
        color: "#fff", // Texto blanco
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para mejor visibilidad
      }}
    >
      <span
        className="close-upload"
        onClick={() => setUploadModalVisible(false)}
        style={{
          cursor: "pointer",
          color: "#fff", // Icono de cerrar en blanco
          fontSize: "24px",
          position: "absolute",
        }}
      >
        &times;
      </span>
      <h2>Subir un sonido</h2>
      <label htmlFor="name" style={{ marginTop: "10px" }}>
        Nombre
      </label>
      <input
        type="text"
        id="name"
        className="uploadInput"
        value={soundDetails.name}
        onChange={handleInputChange}
        style={{
          height: "30px",
          marginBottom: "10px",
          padding: "5px",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      />
      <label htmlFor="description">Descripción</label>
      <input
        type="text"
        id="description"
        className="uploadInput"
        value={soundDetails.description}
        onChange={handleInputChange}
        style={{
          height: "30px",
          marginBottom: "10px",
          padding: "5px",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      />
      <label htmlFor="tags">Metáforas</label>
      <input
        type="text"
        id="metaphors"
        className="uploadInput"
        value={soundDetails.metaphors}
        onChange={handleInputChange}
        style={{
          height: "30px",
          marginBottom: "10px",
          padding: "5px",
          borderRadius: "5px",
          fontSize: "16px",
        }}
        />
      <label htmlFor="soundFile">Archivo de sonido</label>
      <input
        type="file"
        id="soundFile"
        className="uploadInput"
        onChange={handleFileChange}
        style={{
          marginBottom: "10px",
          padding: "5px",
          borderRadius: "5px",
        }}
      />
      <button
        id="uploadSound"
        onClick={handleUploadSound}
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Subir
      </button>
    </div>
  </div>
)}


      {/* Lista de sonidos */}
      <input
        type="text"
        placeholder="Filtrar por metáfora"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      />

      <div id="sound-list">
        {filteredSounds.map((sound) => (
          <div
            key={sound.name}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={sound.image}
              alt={sound.name}
              width="50"
              height="50"
              style={{ marginRight: "20px", borderRadius: "8px" }}
            />
            <div style={{ flexGrow: 1 }}>
              <div>
                <strong>Nombre:</strong> {sound.name}
              </div>
              <div>
                <strong>Metáforas:</strong> {sound.metaphors}
              </div>
            </div>
            <button
              onClick={() => playSound(sound.url)}
              style={{
                width: "fit-content",
                padding: "5px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-play-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedSound(sound)}
              style={{
                width: "fit-content",
                padding: "5px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {selectedSound && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <h3>Editar Metáforas</h3>
            <textarea
              value={selectedSound.metaphors}
              onChange={(e) =>
                setSelectedSound({ ...selectedSound, metaphors: e.target.value })
              }
              rows={4}
              style={{ width: "100%", marginBottom: "20px" }}
            />
            <button
              onClick={() => saveMetaphors(selectedSound.metaphors)}
              style={{ marginRight: "10px" }}
            >
              Guardar
            </button>
            <button onClick={() => setSelectedSound(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
