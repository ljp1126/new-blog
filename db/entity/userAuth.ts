import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { JoinColumn } from 'typeorm/index.js';
import { User } from './user'

@Entity({name: 'users'})

export class UserAuth extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  nickName!: string;

  @Column()
  identity_type!: string;

  @Column()
  identifier!: string;

  @Column()
  credential!: string;

  @Column()
  introduce!: string;

  @ManyToOne((type: any) => User, {
    cascade: true
  })

  @JoinColumn({name: 'user_id'})
  user!: User

}