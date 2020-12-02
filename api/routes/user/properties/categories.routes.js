const { Router } = require('express')
const passport = require('passport')
const ctr = require('../../../controllers/user/properties/categories.controller')
const router = Router()

// /api/user/properties/categories/fetchCategoriesGroups/:id
router.get(
  '/fetchCategoriesGroups/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.fetchCategoriesGroups
)

// POST => //api/user/properties/categories/categoriesGroup
router.post(
  '/categoriesGroup',
  passport.authenticate('jwt', { session: false }),
  ctr.createCategoriesGroup)

// PUT => /api/user/properties/categories/editCategoriesGroup
router.put(
  '/editCategoriesGroup',
  passport.authenticate('jwt', { session: false }),
  ctr.updateCategoriesGroup)

// DELETE => /api/user/properties/categories/removeCategoriesGroup
router.post(
  '/removeCategoriesGroup',
  passport.authenticate('jwt', { session: false }),
  ctr.removeCategoriesGroup)

// POST => /api/user/properties/categories/chgOrderCategoriesGroups
router.post(
  '/chgOrderCategoriesGroups',
  passport.authenticate('jwt', { session: false }),
  ctr.chgOrderCategoriesGroups)

// /api/user/properties/categories/fetchCategories/:id
router.get(
  '/fetchCategories/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.fetchCategories
)

// POST => /api/user/properties/categories/createCategory
router.post(
  '/createCategory',
  passport.authenticate('jwt', { session: false }),
  ctr.createCategory)

// PUT => /api/user/properties/categories/editCategory
router.put(
  '/editCategory',
  passport.authenticate('jwt', { session: false }),
  ctr.updateCategory)

// DELETE => /api/user/properties/categories/removeCategory
router.post(
  '/removeCategory',
  passport.authenticate('jwt', { session: false }),
  ctr.removeCategory)

// POST => /api/user/properties/categories/chgOrderCategories
router.post(
  '/chgOrderCategories',
  passport.authenticate('jwt', { session: false }),
  ctr.chgOrderCategories)

module.exports = router
