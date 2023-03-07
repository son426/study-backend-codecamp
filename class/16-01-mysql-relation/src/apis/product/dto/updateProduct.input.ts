import {
  Field,
  InputType,
  Int,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Min } from 'class-validator';
import { CreateProductInput } from './createProduct.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}

// PickType(createProductInput, ["name", "input"])
// OmitType(createProductInput, ["description"])
