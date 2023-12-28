import { Transform } from 'class-transformer';

export function ParseInt(defaultValue: number | undefined = undefined): PropertyDecorator {
	return Transform(({ value }) => value ? Number(value) : defaultValue);
}

export function ParseBoolean(defaultValue: boolean | undefined = undefined): PropertyDecorator {
	return Transform(({ value }) => value ? value === 'true' : defaultValue);
}

export function ParseDate(defaultValue: Date | undefined | null = null): PropertyDecorator {
	return Transform(({ value }) => value ? new Date(value) : defaultValue);
}