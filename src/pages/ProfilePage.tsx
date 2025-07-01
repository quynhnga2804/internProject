import { Modal, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import TablePost from '../components/TablePost'
import { getPosts, createPost, updatePost, deletePost, getTags } from '../services/api'
import { Layout } from 'antd'
import styles from './ProfilePage.module.scss'


const { Sider } = Layout;

type Post = {
  id: number;
  title: string;
  description: string;

};

const ProfilePage = () => {
  const [tagOptions, setTagOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
  const timeout = setTimeout(() => {
    fetchData();
  }, 500);
    fetchTags();

  return () => clearTimeout(timeout);
}, [searchTitle, currentPage, selectedTag]);

  const fetchData = async () => {
    try {
      const res = await getPosts(searchTitle, currentPage);
      let posts = res.posts ?? [];

      if (selectedTag) {
        posts = posts.filter((post: any) =>
          post.tags?.includes(selectedTag)
        );
      }

      setPosts(posts);
      setTotalPosts(res.total ?? 0);
    } catch (err) {
      setPosts([]);
    }
  };

  const fetchTags = async () => {
    try {
      const tags = await getTags();
      const options = tags.map((tag: string) => ({
        label: tag,
        value: tag,
      }));
      setTagOptions(options);
    } catch (error) {
      console.error('Lỗi khi lấy tags:', error);
    }
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return alert('Title is required');
    await createPost({ title: newTitle, description: newDesc, tags: 'HTML, Css' });
    setIsModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    fetchData();
  };

  const handleEdit = async (post: Post) => {
    if (!post.id) {
      alert('Post này không có ID hợp lệ, không thể chỉnh sửa!');
      return;
    }
    const title = prompt('Edit Title:', post.title);
    const description = prompt('Edit Description:', post.description);
    if (title && description) {
      await updatePost(post.id.toString(), { title, description });
      fetchData();
    }
  };

  const handleDelete = async (id: number) => {
    if (!id) {
      alert('Post này không có ID hợp lệ, không thể xóa!');
      return;
    }
    if (window.confirm('Are you sure to delete?')) {
      await deletePost(id.toString());
      fetchData();
    }
  };

  return (
    <Layout>
      <Sider><Sidebar /></Sider>
      <Layout className={styles.contents}>
        <div style={{ display: 'flex', gap: 155, marginBottom: '20px' }}>
          <button className={styles.btn} onClick={() => setIsModalOpen(true)}>Add new</button>
          <Input className={styles.inp} placeholder='Title' value={searchTitle} onPressEnter={fetchData} onChange={(e) => {
            setSearchTitle(e.target.value);
            setCurrentPage(1);
          }} />
          <Select
            className={styles.inp}
            placeholder='Tags'
            options={tagOptions}
            allowClear
            value={selectedTag ?? undefined}
            onChange={(value) => {
              setSelectedTag(value);
              setCurrentPage(1);
            }}
          />
        </div>

        <TablePost data={posts} onEdit={handleEdit} onDelete={handleDelete} pagination={{
          current: currentPage,
          pageSize: 10,
          total: totalPosts,
          onChange: (page: number) => setCurrentPage(page)
        }} />

        <Modal
          title='Add new item'
          open={isModalOpen}
          onOk={handleCreate}
          onCancel={() => setIsModalOpen(false)}
          okText='Tạo'
          cancelText='Hủy'
        >
          <Input
            placeholder='Title'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Input.TextArea
            rows={4}
            placeholder='Description'
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
        </Modal>
      </Layout>
    </Layout>
  )
}

export default ProfilePage