import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ProjectsEntity from "./info.entity";
import DeepLearnsEntity from "../images/deeplearn.entity";

@Entity({ name: 'projects_inspect_entity' })
export default class ProjectInspectEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => ProjectsEntity, { nullable: false })
  @JoinColumn({ name: 'project', referencedColumnName: 'uuid' })
  project: ProjectsEntity;

  @Column({
    name: 'DateTimeOriginal',
    type: 'timestamp',
    nullable: false
  })
  dateTimeOriginal: Date;

  @Column({
    name: 'ClassName',
    type: 'text',
    nullable: false
  })
  className: string;

  @Column({
    name: 'Count',
    type: 'int',
    nullable: false,
    default: 0
  })
  count: string;

  @ManyToOne(() => DeepLearnsEntity, { nullable: false })
  @JoinColumn({ name: 'deeplearn', referencedColumnName: 'uuid' })
  deeplearn: DeepLearnsEntity;

  @Column({
    name: 'SerialNumber',
    type: 'text',
    nullable: false
  })
  serialNumber: string;
}
