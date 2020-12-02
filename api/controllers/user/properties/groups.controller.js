const Group = require('../../../models/properties/group.model')
const User = require('../../../models/user.model')

module.exports.fetchGroups = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('groups')
    res.json(user.groups)
  } catch (e) {
    res.status(500).json({ message: 'failedFetchGroups' })
  }
}

module.exports.create = async (req, res) => {
  try {
    const group = new Group({
      userId: req.body.userId,
      title: req.body.title,
      comment: req.body.comment,
      typeOfGroup: req.body.typeOfGroup,
      visible: req.body.visible
    })
    await group.save()
    const user = await User.findById(group.userId)
    user.groups.unshift(group._id)
    await user.save()
    res.status(201).json({ message: 'newGroupCreated', group })
  } catch (e) {
    res.status(409).json({ message: 'failedCreateGroup' })
  }
}

module.exports.update = async (req, res) => {
  const $set = {
    userId: req.body.userId,
    title: req.body.title,
    comment: req.body.comment,
    typeOfGroup: req.body.typeOfGroup,
    visible: req.body.visible
  }
  try {
    await Group.findOneAndUpdate({ _id: req.body.groupId }, { $set })
    res.status(201).json({ message: 'groupUpdated' })
  } catch (e) {
    res.status(409).json({ message: 'failedUpdateGroup' })
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Group.deleteOne({ _id: req.body.groupId })
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pullAll: { groups: [req.body.groupId] } },
      { new: true }
    )
    res.status(201).json({ message: 'groupRemoved' })
  } catch (e) {
    res.status(409).json({ message: 'failedRemoveGroup' })
  }
}

module.exports.chgOrderGroups = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.body.userId }, // _id: req.body.userId
      { $set: { groups: req.body.data } }
    )
    res.status(201).json({ message: 'orderGroupsUpdated' })
  } catch (e) {
    res.status(409).json({ message: 'failedChgOrderGroups' })
  }
}
