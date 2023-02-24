import {MikroORM} from '@mikro-orm/core';

export async function updateSchema(microOrmSettings: any, clearDb: boolean = false, recreateDb: boolean = false) {

  const orm = await MikroORM.init(microOrmSettings);

  const generator = orm.getSchemaGenerator();

  await generator.ensureDatabase();

  // const dropDump = await generator.getDropSchemaSQL();
  // console.log(dropDump);
  //
  // const createDump = await generator.getCreateSchemaSQL();
  // console.log(createDump);
  //
  // const updateDump = await generator.getUpdateSchemaSQL();
  // console.log(updateDump);

  // there is also `generate()` method that returns drop + create queries
  // const dropAndCreateDump = await generator.generate();
  // console.log(dropAndCreateDump);

  if (clearDb)
    await generator.clearDatabase(); // removes all data

  // or you can run those queries directly, but be sure to check them first!
  await generator.updateSchema();

  // in tests it can be handy to use those:
  // await generator.refreshDatabase(); // ensure db exists and is fresh


  if (recreateDb) {
    await generator.dropSchema();
    await generator.createSchema();

  }


  await orm.close(true);
}
