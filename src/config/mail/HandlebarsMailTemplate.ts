import handlebars from 'handlebars';

export interface ITemplateVariable {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

export default class handlebarsMailTemplate {
  public async parse({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
