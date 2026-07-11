import { get_settings } from "./storage.js"
import { initUI } from "./ui.js"

const settings = get_settings()

initUI(settings)