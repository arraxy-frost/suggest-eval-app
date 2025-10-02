import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Vote from "./vote.model";

@Table({
    tableName: "suggestions"
})
export default class Suggestion extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 255]
        }
    })
    title: string;

        @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    })
    description: string;

    @HasMany(() => Vote)
    votes?: Vote[];
}