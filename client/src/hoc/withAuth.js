import {useAuth} from '../customHooks'
const WithAuth=props=>useAuth()&&props.children;
export default WithAuth