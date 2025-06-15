import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "../components/Button";

const Form = ({ mode = "create", initialData = {}, onSuccess }) => {
  const [formData, setFormData] = useState({
    play_name: "",
    play_url: "",
    play_thumbnail: "",
    play_genre: "",
    play_description: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: mode === "edit" ? "Simpan perubahan?" : "Tambah data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
      backdrop: false,
    });

    if (!confirm.isConfirmed) return;

    try {
      const url =
        mode === "edit"
          ? `https://webfmsi.singapoly.com/api/playlist/update/${initialData.id_play}`
          : "https://webfmsi.singapoly.com/api/playlist/46"; // ← sesuaikan group_id

      // GUNAKAN FORMDATA
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      const response = await fetch(url, {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // atau .json() tergantung respons
        throw new Error(`Gagal menyimpan data: ${errorMessage}`);
      }

      Swal.fire({
        title: "Berhasil!",
        text:
          mode === "edit" ? "Playlist diperbarui." : "Playlist ditambahkan.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        backdrop: false,
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      Swal.fire("Gagal", err.message, "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 mt-6 max-w-md mx-auto bg-white rounded-2xl border border-blue-200"
    >
      <h2 className="text-2xl font-semibold text-center mb-2">
        {mode === "edit" ? "Edit Playlist" : "Tambah Playlist Baru"}
      </h2>

      <input
        type="text"
        name="play_name"
        value={formData.play_name}
        onChange={handleChange}
        placeholder="Nama Playlist"
        className="border border-gray-300 rounded p-2"
        required
      />

      <input
        type="text"
        name="play_url"
        value={formData.play_url}
        onChange={handleChange}
        placeholder="URL Playlist"
        className="border border-gray-300 rounded p-2"
        required
      />

      <input
        type="text"
        name="play_thumbnail"
        value={formData.play_thumbnail}
        onChange={handleChange}
        placeholder="Thumbnail URL"
        className="border border-gray-300 rounded p-2"
        required
      />

      <select
        name="play_genre"
        value={formData.play_genre}
        onChange={handleChange}
        className="border border-gray-300 rounded p-2 text-gray-500"
        required
      >
        <option value="">-- Pilih Genre --</option>
        <option value="Education">Education</option>
        <option value="Music">Music</option>
        <option value="Movie">Movie</option>
      </select>

      <textarea
        name="play_description"
        value={formData.play_description}
        onChange={handleChange}
        placeholder="Deskripsi Playlist"
        className="border border-gray-300 rounded p-2"
        required
      />

      <Button type="submit">
        {mode === "edit" ? "Simpan Perubahan" : "Simpan"}
      </Button>
    </form>
  );
};

export default Form;
