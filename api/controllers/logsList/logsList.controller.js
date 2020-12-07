const Log = require('../../models/logsList/logsList.model')
const User = require('../../models/user.model')

module.exports.fetchLogs = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(['logslist'])
    res.json(user.logslist)
  } catch (e) {
    res.status(500).json({ message: 'failedFetchLogs' })
  }
}

module.exports.create = async (req, res) => {
  try {
    const log = new Log({
      userId: req.body.userId,
      message: req.body.message,
      alertType: req.body.alertType,
      color: req.body.color,
      text: req.body.text
    })
    await log.save()
    const user = await User.findById(log.userId)
    user.logslist.unshift(log._id)
    await user.save()
    res.status(201).json({ message: 'newLogCreated', log })
  } catch (e) {
    res.status(409).json({ message: 'failedCreateLog' })
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Log.deleteOne({ _id: req.body.logId })
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pullAll: { logslist: [req.body.logId] } },
      { new: true }
    )
    res.status(201).json({ message: 'logRemoved' })
  } catch (e) {
    res.status(409).json({ message: 'failedRemoveLog' })
  }
}
