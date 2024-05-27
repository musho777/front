import { useSelector } from "react-redux"
import { Languages } from "../store/ducks/language/contracts/state"
import { getCurrentLanguage } from "../store/ducks/language/selectors"


export default function getStringInCurrentLanguage(ruString: string, engString: string, tuString: string, uzString: string) {
    const currentLanguage = useSelector(getCurrentLanguage)

    if (currentLanguage === Languages.RU) return ruString
    if (currentLanguage === Languages.ENG) return engString
    if (currentLanguage === Languages.TU) return tuString
    if (currentLanguage === Languages.UZ) return uzString
}