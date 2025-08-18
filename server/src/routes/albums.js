import { Router } from 'express';
import Album from '../models/Album.js';
import Comment from '../models/Comment.js';
import auth from '../middleware/auth.js';
import { upload } from '../services/storage.js';
import { computeMaxImages, generateAutoPages } from '../services/autoLayout.js';

const router = Router();

// Create album
router.post('/', auth, async (req, res) => {
  try {
    const { title, size='12x12', mode='manual', pages=18 } = req.body;
    const album = await Album.create({ title, size, mode, pages: [], clientId: req.user.id });
    res.json(album);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// List albums
router.get('/', auth, async (req, res) => {
  const list = await Album.find({ clientId: req.user.id }).sort('-createdAt');
  res.json(list);
});

// Upload images (local storage)
router.post('/:id/images', auth, upload.array('images', 100), async (req, res) => {
  const files = req.files.map(f => `/uploads/${f.filename}`);
  res.json({ files });
});

// Generate automated layout
router.post('/:id/auto-layout', auth, async (req, res) => {
  const { id } = req.params;
  const { images=[], pagesTotal=18 } = req.body;
  const max = computeMaxImages(pagesTotal);
  const imgs = images.slice(0, max);
  const pages = generateAutoPages(imgs, pagesTotal);
  const album = await Album.findByIdAndUpdate(id, { mode: 'auto', pages }, { new: true });
  res.json(album);
});

// Update a page (manual placement)
router.put('/:id/pages/:index', auth, async (req, res) => {
  const { id, index } = req.params;
  const { images, layout } = req.body;
  const album = await Album.findById(id);
  if (!album) return res.status(404).json({ message: 'Album not found' });
  album.mode = 'manual';
  album.pages[index] = { index: Number(index), images, layout };
  await album.save();
  res.json(album);
});

// Comments
router.get('/:id/comments', auth, async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.find({ albumId: id }).sort('createdAt');
  res.json(comments);
});

router.post('/:id/comments', auth, async (req, res) => {
  const { id } = req.params;
  const { pageIndex, text } = req.body;
  const c = await Comment.create({ albumId: id, pageIndex, text, authorId: req.user.id });
  res.json(c);
});

// Approve
router.post('/:id/approve', auth, async (req, res) => {
  const { id } = req.params;
  const album = await Album.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
  res.json(album);
});

export default router;
