export async function get_user_data(req, res) {
  res.status(201).send(`${req?.cookies?.token}`)
}
