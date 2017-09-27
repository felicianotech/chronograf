package server

import "testing"

func TestService_Users(t *testing.T) {
  type fields struct {
    UsersStore chronograf.UsersStore
    Logger chronograf.Logger
  }
  type args struct {
		w *httptest.ResponseRecorder
		r *http.Request
	}
  tests := []struct {
    name string
    fields fields
    args args
    ID string
    wantStatus int
    wantContentType string
    wantBody string
  }{
    {
      name: "All Chronograf users",
      args: args{
        w: httptest.NewRecorder(),
        r: httptest.NewRequest(
          "GET",
          "http://server.local/chronograf/v1/users",
          nil
        ),
      },
      fields: fields{
        Logger: log.New(log.DebugLevel),
        UsersStore: &mocks.UsersStore{
          GetF: func(ctx context.Context, ID int) (chronograf.User, error) {
            return chronograf.User{
              Username: "bob",
              Organization: "",
              Provider: "",
              Scheme: "",
            }, nil
          },
        },
      },
      ID: "1",
      wantStatus: http.StatusOK,
      wantContentType: "application/json",
      wantBody: "",
    }
  }
}