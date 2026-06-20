const { NodeSDK } = require("@opentelemetry/sdk-node");
const { OTLPLogExporter } = require("@opentelemetry/exporter-logs-otlp-http");
const {
  WinstonInstrumentation,
} = require("@opentelemetry/instrumentation-winston");
const { resourceFromAttributes } = require("@opentelemetry/resources");
const { ATTR_SERVICE_NAME } = require("@opentelemetry/semantic-conventions");
const { BatchLogRecordProcessor } = require("@opentelemetry/sdk-logs");

// Configure the OTLP log exporter
// It automatically reads OTEL_EXPORTER_OTLP_ENDPOINT and OTEL_EXPORTER_OTLP_HEADERS
// from environment variables. If not set, defaults to http://localhost:4318
const logExporter = new OTLPLogExporter({});

// Initialize the OpenTelemetry SDK
const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]:
      process.env.OTEL_SERVICE_NAME || "nodejs-winston-logger",
  }),
  logRecordProcessor: new BatchLogRecordProcessor(logExporter),
  instrumentations: [
    new WinstonInstrumentation({
      // configure the instrumentation
    }),
  ],
});

sdk.start();

// Graceful shutdown
process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => console.log("OpenTelemetry SDK shut down successfully"))
    .catch((error) => console.error("Error shutting down SDK", error))
    .finally(() => process.exit(0));
});

module.exports = sdk;
