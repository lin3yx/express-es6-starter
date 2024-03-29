import _ from 'lodash';

async function getPost(postId) {
  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const data = await post.json();

  return data;
}

async function getAllPosts() {
  const posts = [];

  _.each(
    Array.from({ length: 10 }, (v, i) => i + 1),
    (id) => {
      const post = getPost(id);
      posts.push(post);
    },
  );

  try {
    return Promise.all(posts);
  } catch (error) {
    return error;
  }
}

async function getPosts(req, res) {
  const posts = await getAllPosts();

  res.status(200).json({ posts });
}

async function getAddress(req, res) {
  const address = await fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => response.json())
    .then((user) => user.address);

  res.status(200).json({ address });
}

export { getPosts, getAddress };
