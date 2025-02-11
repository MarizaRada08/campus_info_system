import http from "http";
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";


import "./config/logging";
import { DEVELOPMENT, mongo, server } from "./config/config";

import "reflect-metadata";

import { corsHandler } from "./middleware/corsHandler";
import { loggingHandler } from "./middleware/loggingHandler";
import { routeNotFound } from "./middleware/routeNotFound";
import { specs } from "./config/swagger";
import bookRoutes from "./routes/bookRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import fineRoutes from "./routes/fineRoutes";
import shelfRoutes from "./routes/shelfRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import authRoutes from "./routes/authRoutes";
import librarianRoutes from "./routes/librarianRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import courseRoutes from "./routes/courseRoutes";
import departmentRoutes from "./routes/departmentRoutes";
import facultyRoutes from "./routes/facultyRoutes";
import gradeRoutes from "./routes/gradeRoutes";
import leaveRoutes from "./routes/leaveRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";
import enrollmentRoutes from "./routes/enrollmentRoutes";
import studentRoutes from "./routes/studentRoutes";
import subjectsRoutes from "./routes/subjectsRoutes";

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
  logging.log("----------------------------------------");
  logging.log("Initializing API");
  logging.log("----------------------------------------");
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());

  logging.log("----------------------------------------");
  logging.log("Swagger UI");
  logging.log("----------------------------------------");
  application.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Your API Documentation",
    })
  );

  logging.log("----------------------------------------");
  logging.log("Connect to Mongo");
  logging.log("----------------------------------------");
  try {
    console.log(mongo)
    const connection = await mongoose.connect(
      mongo.MONGO_CONNECTION,
      mongo.MONGO_OPTIONS
    );
    logging.log("----------------------------------------");
    logging.log("Connected to Mongo: ", connection.version);
    logging.log("----------------------------------------");
  } catch (error) {
    logging.log("----------------------------------------");
    logging.error(error);
    logging.error("Unable to connect to Mongo");
    logging.log("----------------------------------------");
  }

  logging.log("----------------------------------------");
  logging.log("Logging & Configuration");
  logging.log("----------------------------------------");
  application.use(loggingHandler);
  application.use(corsHandler);

  logging.log("----------------------------------------");
  logging.log("Define Controller Routing");
  logging.log("----------------------------------------");
  application.use(authRoutes)
  application.use(bookRoutes);
  application.use(categoryRoutes);
  application.use(fineRoutes);
  application.use(librarianRoutes);
  application.use(shelfRoutes);
  application.use(transactionRoutes);
  application.use(attendanceRoutes);
  application.use(courseRoutes);
  application.use(departmentRoutes);
  application.use(enrollmentRoutes);
  application.use(facultyRoutes);
  application.use(gradeRoutes);
  application.use(leaveRoutes);
  application.use(scheduleRoutes);
  application.use(studentRoutes);
  application.use(subjectsRoutes);
  
  logging.log("----------------------------------------");
  logging.log("Define Routing Error");
  logging.log("----------------------------------------");
  application.use(routeNotFound)

  logging.log("----------------------------------------");
  logging.log("Starting Server");
  logging.log("----------------------------------------");
  httpServer = http.createServer(application);
  httpServer.listen(server.SERVER_PORT, () => {
    logging.log("----------------------------------------");
    logging.log(
      `Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`
    );
    logging.log("----------------------------------------");
  });
};

export const Shutdown = (callback: any) =>
  httpServer && httpServer.close(callback);

Main();

