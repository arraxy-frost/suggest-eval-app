import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Suggestion from "./suggestion.model";

@Table({
    tableName: "votes",
    indexes: [
    {
        unique: true,
        fields: ['sender', 'suggestion_id']
    }
    ]
})
export default class Vote extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.STRING(45),
        validate: {
            notEmpty: true,
            isIP: true
        }
    })
    sender: string;

    @ForeignKey(() => Suggestion)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "suggestion_id"
    })
    suggestionId: number;

    @BelongsTo(() => Suggestion)
    suggestion?: Suggestion
}