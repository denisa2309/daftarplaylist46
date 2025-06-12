import { useEffect, useState } from "react";
import { Modal, Input, Button, Card, Tag, message, Form, Select } from "antd";
import { getData, sendData, deleteData } from "../../utils/api";
const { Meta } = Card;
const { Option } = Select;

const dummyPlaylists = [
  {
    id: 1,
    play_name: "Playlist 1",
    play_url: "#",
    play_thumbnail: "https://placehold.co/300x180",
    play_genre: "music",
    play_description: "This is music playlist",
  },
  {
    id: 2,
    play_name: "Playlist 2",
    play_url: "#",
    play_thumbnail: "https://placehold.co/300x180",
    play_genre: "movie",
    play_description: "This is movie playlist",
  },
];

export default function App() {
  const [playlists, setPlaylists] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Replace with actual GET call
    setPlaylists(dummyPlaylists);
  }, []);

  const refreshData = () => {
    // Replace with fetch(/api/playlist) when ready
    setPlaylists(dummyPlaylists);
  };

  const handleSubmit = async () => {
    const values = form.getFieldsValue();

    const formData = new FormData();
    formData.append("play_name", values.play_name);
    formData.append("play_url", values.play_url);
    formData.append("play_thumbnail", values.play_thumbnail);
    formData.append("play_genre", values.play_genre);
    formData.append("play_description", values.play_description);

    try {
      const res = await fetch("/api/playlist/46", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok || result?.datas) {
        message.success("Playlist berhasil ditambahkan!");
        setOpenModal(false);
        form.resetFields();
        refreshData();
      } else {
        message.error("Gagal menambahkan playlist");
      }
    } catch (err) {
      console.error(err);
      message.error("Terjadi kesalahan saat mengirim data");
    }
  };

  return (
    <div className="p-6 bg-pink-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Daftar Playlist Saya</h1>
        <Button type="primary" className="bg-pink-500" onClick={() => setOpenModal(true)}>
          + Tambah Playlist
        </Button>
      </div>

      <Input.Search placeholder="Cari playlist..." className="mb-6" allowClear />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((item) => (
          <Card key={item.id} cover={<img alt={item.play_name} src={item.play_thumbnail} />} actions={[<span key="edit">✏️</span>, <span key="delete">🗑️</span>]}>
            <Meta title={item.play_name} description={`${item.play_description}`} />
            <div className="mt-2">
              <div>{item.play_genre && <Tag>#{item.play_genre}</Tag>}</div>
              <div className="text-sm text-gray-500">12 lagu</div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={openModal} title="Tambah Playlist" onCancel={() => setOpenModal(false)} footer={null}>
        <Form layout="vertical" form={form}>
          <Form.Item name="play_name" label="Nama Playlist" rules={[{ required: true }]}>
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item name="play_url" label="URL Playlist" rules={[{ required: true }]}>
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item name="play_thumbnail" label="URL Thumbnail" rules={[{ required: true }]}>
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item name="play_genre" label="Genre" rules={[{ required: true }]}>
            <Select>
              <Option value="music">Music</Option>
              <Option value="movie">Movie</Option>
              <Option value="education">Education</Option>
            </Select>
          </Form.Item>
          <Form.Item name="play_description" label="Deskripsi">
            {" "}
            <Input.TextArea />{" "}
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit}>
              Tambah
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
