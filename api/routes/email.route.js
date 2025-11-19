import express from 'express';
import { sendEmail } from '../emails/OrderConfirmationEmail.controller.js';

const emailRouter = express.Router();

emailRouter.post("/email", sendEmail);

export default emailRouter;