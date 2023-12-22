require('dotenv').config()
const path = require('path')
const express = require('express')
const colors = require('colors')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const auth = require('./middleware/auth0')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(auth)

// Goal and Task Routes
const userRoutes = require('./routes/userRoutes')
const goalRoutes = require('./routes/goalRoutes')
const taskRoutes = require('./routes/taskRoutes')
const commentRoutes = require('./routes/commentRoutes')
const gameRoutes = require('./routes/gameRoutes')

app.use('/api/users', userRoutes)
app.use('/api/goals', goalRoutes)
app.use('/api/goals/:goalId/tasks', taskRoutes)
app.use('/api/games/:userId', gameRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/dalle', require('./routes/dalleRoute'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`))
