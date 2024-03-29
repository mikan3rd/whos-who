import { registerEnumType } from '@nestjs/graphql';

export enum PersonScalarFieldEnum {
    id = "id",
    name = "name",
    nameHiragana = "nameHiragana",
    nameKatakana = "nameKatakana",
    nameAlphabet = "nameAlphabet",
    birthDate = "birthDate",
    occupationId = "occupationId",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(PersonScalarFieldEnum, { name: 'PersonScalarFieldEnum', description: undefined })
