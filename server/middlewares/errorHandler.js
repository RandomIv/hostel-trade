const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.message === 'Username is already taken' || err.message === 'Email is already taken') {
        return res.status(409).json({ error: err.message });
    }

    res.status(500).json({ error: 'Internal Server Error' });
}

export default errorHandler;
