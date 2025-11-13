import React, { useState, useEffect } from 'react';
import Button from './Button';
import Card from './Card';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPosts(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPosts(); }, [page]);

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">API Posts</h2>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" />

      {loading ? <p>Loading...</p> :
        error ? <p className="text-red-500">{error}</p> :
          <ul className="space-y-4">
            {filteredPosts.map(post => (
              <Card key={post.id} className="p-3">
                <h3 className="font-bold">{post.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
              </Card>
            ))}
          </ul>}

      <div className="flex justify-between mt-4">
        <Button variant="secondary" size="sm" onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>Previous</Button>
        <Button variant="secondary" size="sm" onClick={() => setPage(p => p + 1)}>Next</Button>
      </div>
    </Card>
  );
}

export default PostsList;
