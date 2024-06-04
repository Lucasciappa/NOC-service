import { envs } from '../config/plugins/envs.plugin';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';


const logRepository = new LogRepositoryImpl(
  // new FileSystemDatasource(),
  new MongoLogDatasource(),
);
const emailService = new EmailService();


export class Server {

  public static start() {

    console.log( 'Server started...' );

    //todo: Mandar email
    // new SendEmailLogs(
    //   emailService, 
    //   fileSystemLogRepository,
    // ).execute(
    //   ['lucasciappa97@gmail.com','lciapparelli@telecentro.net.ar']
    // )
    // emailService.sendEmailWithFileSystemLogs(
    // ['lucasciappa97@gmail.com','lciapparelli@telecentro.net.ar']
    // );
    
    
    
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com';
        new CheckService(
          logRepository,
          () => console.log( `${ url } is ok` ),
          ( error ) => console.log( error ),
        ).execute( url );
        // new CheckService().execute( 'http://localhost:3000' );
        
      }
    );


  }


}