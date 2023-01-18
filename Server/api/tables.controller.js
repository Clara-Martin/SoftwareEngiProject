import TablesDAO from "../dao/tablesDAO.js"

export default class TablesController {
  static async apiGetTables(req, res, next) {
    const tablesPerPage = req.query.tablesPerPage ? parseInt(req.query.tablesPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.numGuests) {
      filters.numGuests = parseFloat(req.query.numGuests)
    }
    if (req.query.dateTime) {
      filters.dateTime = req.query.dateTime
    }

    const { tablesList, totalNumTables } = await TablesDAO.getTables({
      filters,
      page,
      tablesPerPage,
    })

    let response = {
        tables: tablesList,
        page: page,
        filters: filters,
        entries_per_page: tablesPerPage,
        total_results: totalNumTables,
    }
    res.json(response)
  }
}