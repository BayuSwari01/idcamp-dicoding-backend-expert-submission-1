import { InvariantError } from "./InvariantError";

const directories: { [key: string]: InvariantError } = {
  "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError("tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada"),
  "REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError("tidak dapat membuat user baru karena tipe data tidak sesuai"),
  "REGISTER_USER.USERNAME_LIMIT_CHAR": new InvariantError("tidak dapat membuat user baru karena karakter username melebihi batas limit"),
  "REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER": new InvariantError("tidak dapat membuat user baru karena username mengandung karakter terlarang"),
  "USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError("harus mengirimkan username dan password"),
  "USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError("username dan password harus string"),
  "REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN": new InvariantError("harus mengirimkan token refresh"),
  "REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError("refresh token harus string"),
  "DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN": new InvariantError("harus mengirimkan token refresh"),
  "DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError("refresh token harus string"),
  "CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError("tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada"),
  "CREATE_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError("tidak dapat membuat thread baru karena tipe data tidak sesuai"),
  "CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError("tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada"),
  "CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError("tidak dapat membuat thread baru karena tipe data tidak sesuai"),
  "DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError("tidak dapat menampilkan detail thread karena properti yang dibutuhkan tidak ada"),
  "DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError("tidak dapat menampilkan detail thread karena tipe data tidak sesuai"),
  "DETAIL_THREAD.COMMENT_NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError("komentar tidak sesuai spesifikasi"),
  "CREATE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError("tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada"),
  "CREATE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError("tidak dapat membuat komentar baru karena tipe data tidak sesuai"),
  "CREATED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError("tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada"),
  "CREATED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError("tidak dapat membuat komentar baru karena tipe data tidak sesuai"),
  "DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError("tidak dapat menampilkan detail komentar karena properti yang dibutuhkan tidak ada"),
  "DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError("tidak dapat menampilkan detail komentar karena tipe data tidak sesuai"),
};

export const DomainErrorTranslator = {
  translate(error: Error): Error | InvariantError {
    return directories[error.message] || error;
  },
};
