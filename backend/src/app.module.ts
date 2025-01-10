import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { CategoryModule } from './category/category.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // replace with your PostgreSQL username
      password: 'Lifeoftheworld@3',   // replace with your PostgreSQL password
      database: 'abysiniaQuiz',   // replace with your database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,           // Set to false in production
    }),
    AuthModule,
    UserModule,
    QuestionModule,
    CategoryModule,
    ResultModule,
  
  ],
})
export class AppModule {}
