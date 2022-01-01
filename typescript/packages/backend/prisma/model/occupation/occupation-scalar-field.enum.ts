import { registerEnumType } from '@nestjs/graphql';

export enum OccupationScalarFieldEnum {
    id = "id",
    name = "name",
    nameHiragana = "nameHiragana",
    nameKatakana = "nameKatakana",
    nameAlphabet = "nameAlphabet",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(OccupationScalarFieldEnum, { name: 'OccupationScalarFieldEnum', description: undefined })
