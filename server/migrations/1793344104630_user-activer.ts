import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addColumns('user_data', {
        isActive: { 
            type: 'boolean', 
            notNull: true,
            default: false
        }
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropColumns('user_data', ['isActive']);
}