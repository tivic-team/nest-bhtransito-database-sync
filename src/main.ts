import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { environment } from "./infrastructure/config/environments/env";
import { Logger } from "@nestjs/common";
import { UrlUtil } from "./infrastructure/util/url-util";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(environment.context);
    const logger = new Logger("Bootstrap");
    const port = environment.port ?? 3003;
    await app.listen(port);
    const url = UrlUtil.build({
        host: environment.host,
        port,
        context: environment.context,
        protocol: environment.protocol,
    });
    logger.log(`🚀 Server running on ${url}`);
}
bootstrap();
