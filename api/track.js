// Visitor tracking removed by request — this endpoint is disabled.
export default async function handler(req, res) {
  res.status(410).json({ error: 'Visitor tracking is disabled on this dashboard.' });
}
