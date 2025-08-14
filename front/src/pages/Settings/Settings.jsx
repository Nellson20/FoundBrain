import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/LanguageSelector';
const  Settings = () => {
    const { t } = useTranslation();
    return (
        <LanguageSelector />
    )
}
export default Settings
