const Section = require('../../../models/properties/section.model')
const User = require('../../../models/user.model')

module.exports.fetchSections = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('sections')
    res.json(user.sections)
  } catch (e) {
    res.status(500).json({ message: 'failedFetchSections' })
  }
}

module.exports.create = async (req, res) => {
  try {
    const section = new Section({
      userId: req.body.userId,
      title: req.body.title,
      comment: req.body.comment,
      color: req.body.color,
      visible: req.body.visible
    })
    await section.save()
    const user = await User.findById(section.userId)
    user.sections.unshift(section._id)
    await user.save()
    res.status(201).json({ message: 'newSectionCreated', section })
  } catch (e) {
    res.status(409).json({ message: 'failedCreateSection' })
  }
}

module.exports.update = async (req, res) => {
  const $set = {
    userId: req.body.userId,
    title: req.body.title,
    comment: req.body.comment,
    color: req.body.color,
    visible: req.body.visible
  }
  try {
    await Section.findOneAndUpdate({ _id: req.body.sectionId }, { $set })
    res.status(201).json({ message: 'sectionUpdated' })
  } catch (e) {
    res.status(409).json({ message: 'failedUpdateSection' })
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Section.deleteOne({ _id: req.body.sectionId })
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pullAll: { sections: [req.body.sectionId] } },
      { new: true }
    )
    res.status(201).json({ message: 'sectionRemoved' })
  } catch (e) {
    res.status(409).json({ message: 'failedRemoveSection' })
  }
}

module.exports.chgOrderSections = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.body.userId }, // _id: req.body.userId
      { $set: { sections: req.body.data } }
    )
    res.status(201).json({ message: 'orderSectionsUpdated' })
  } catch (e) {
    res.status(409).json({ message: 'failedChgOrderSections' })
  }
}
