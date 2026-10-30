import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('user_data', {
        id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()'), unique: true },
        name: { type: 'varchar(255)', notNull: true },
        email: { type: 'varchar(255)', notNull: true, unique: true },
        password: { type: 'text', notNull: true },
        isActive: { type: 'boolean', notNull: true },
        createdAt: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    })
    pgm.createTable('tokens', {
        id: { type: 'uuid', unique: true, notNull: true, primaryKey: true, default: pgm.func('gen_random_uuid()') },
        refreshToken: { type: 'text', notNull: true },
        userId: { type: 'uuid', references: 'user_data', notNull: true },
        createdAt: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> { }
