const CategoriesGroup = require('../../../models/properties/categoriesGroup.model')
const Category = require('../../../models/properties/category.model')
const User = require('../../../models/user.model')

module.exports.fetchCategoriesGroups = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const categoriesGroups = await CategoriesGroup.find({ userId: req.params.id }).populate('categories')
    res.json(UsortFromObjectsArrayByArray(categoriesGroups, user.categoriesGroups, '_id'))
  } catch (e) {
    res.status(500).json({ message: 'failedFetchCategoriesGroups' })
  }
}

module.exports.createCategoriesGroup = async (req, res) => {
  try {
    const item = new CategoriesGroup({
      userId: req.body.userId,
      title: req.body.title,
      comment: req.body.comment,
      icon: req.body.icon,
      visible: req.body.visible
    })
    await item.save()
    const user = await User.findById(item.userId)
    user.categoriesGroups.unshift(item._id)
    await user.save()
    res.status(201).json({ message: 'newCategoriesGroupCreated', item })
  } catch (e) {
    res.status(409).json({ message: 'failedCreateCategoriesGroup' })
  }
}

module.exports.updateCategoriesGroup = async (req, res) => {
  const $set = {
    userId: req.body.userId,
    categories: req.body.categories,
    title: req.body.title,
    comment: req.body.comment,
    icon: req.body.icon,
    visible: req.body.visible
  }
  try {
    await CategoriesGroup.findOneAndUpdate({ _id: req.body.categoriesGroupId }, { $set })
    res.status(201).json({ message: 'categoriesGroupUpdated' })
  } catch (e) {
    res.status(409).json({ message: 'failedUpdateCategoriesGroup' })
  }
}

module.exports.removeCategoriesGroup = async (req, res) => {
  try {
    await CategoriesGroup.deleteOne({ _id: req.body.categoriesGroupId })
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pullAll: { categoriesGroups: [req.body.categoriesGroupId] } },
      { new: true }
    )
    res.status(201).json({ message: 'categoriesGroupRemoved' })
  } catch (e) {
    res.status(409).json({ message: 'failedRemoveCategoriesGroup' })
  }
}

module.exports.chgOrderCategoriesGroups = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.body.userId }, // _id: req.body.userId
      { $set: { categoriesGroups: req.body.data } }
    )
    res.status(201).json({ message: 'orderCategoriesGroupsUpdated' })
  } catch (e) {
    res.status(409).json({ message: 'failedChgOrderCategoriesGroups' })
  }
}

module.exports.fetchCategories = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('categories')
    res.json(user.categories)
  } catch (e) {
    res.status(500).json({ message: 'failedFetchCategories' })
  }
}

module.exports.createCategory = async (req, res) => {
  try {
    const item = new Category({
      userId: req.body.userId,
      groupId: req.body.groupId,
      title: req.body.title,
      comment: req.body.comment,
      expenses: req.body.expenses,
      entrances: req.body.entrances,
      visible: req.body.visible
    })
    await item.save()
    const user = await User.findById(item.userId)
    user.categories.unshift(item._id)
    await user.save()
    res.status(201).json({ message: 'newCategoryCreated', item })
  } catch (e) {
    res.status(409).json({ message: 'failedCreateCategory' })
  }
}

module.exports.updateCategory = async (req, res) => {
  const $set = {
    userId: req.body.userId,
    groupId: req.body.groupId,
    title: req.body.title,
    comment: req.body.comment,
    expenses: req.body.expenses,
    entrances: req.body.entrances,
    visible: req.body.visible
  }
  try {
    await Category.findOneAndUpdate({ _id: req.body._id }, { $set })
    res.status(201).json({ message: 'categoryUpdated' })
  } catch (e) {
    res.status(409).json({ message: 'failedUpdateCategory' })
  }
}

module.exports.removeCategory = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.body._id })
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pullAll: { categories: [req.body._id] } },
      { new: true }
    )
    res.status(201).json({ message: 'categoryRemoved' })
  } catch (e) {
    res.status(409).json({ message: 'failedRemoveCategory' })
  }
}

module.exports.chgOrderCategories = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.body.userId }, // _id: req.body.userId
      { $set: { categories: req.body.arr } }
    )
    res.status(201).json({ message: 'orderCategoriesUpdated' })
  } catch (e) {
    res.status(409).json({ message: 'failedChgOrderCategories' })
  }
}

function UsortFromObjectsArrayByArray (ObjectsArray, Array, field) {
  let newArray = []
  if (Array.length && ObjectsArray.length) {
    Array.forEach((item) => {
      const newItem = ObjectsArray
        .filter(objectsItem => objectsItem[field].toString() === item.toString())
      if (newItem) {
        newArray = newArray.concat(newItem)
      }
    })
    return newArray
  } else {
    return []
  }
}
