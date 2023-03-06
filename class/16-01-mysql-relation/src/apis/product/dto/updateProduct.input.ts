import { Field, InputType, Int, OmitType, PartialType, PickType } from "@nestjs/graphql";
import { Min } from "class-validator";
import { createProductInput } from "./createProduct.input";

@InputType()
export class UpdateProductInput extends PartialType(createProductInput){}

// PickType(createProductInput, ["name", "input"])
// OmitType(createProductInput, ["description"])