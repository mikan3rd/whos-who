import { registerEnumType } from '@nestjs/graphql';

export enum PersonScalarFieldEnum {
    id = "id",
    name = "name",
    nameHiragana = "nameHiragana",
    nameKatakana = "nameKatakana",
    nameAlphabet = "nameAlphabet",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(PersonScalarFieldEnum, { name: 'PersonScalarFieldEnum', description: undefined })
