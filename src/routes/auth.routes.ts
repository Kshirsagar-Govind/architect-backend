import { Router } from "express";
import {Register,Login} from '../controller/auth.controller';

const route = Router();

route.post('/register',Register);
route.post('/login',Login);

export default route;